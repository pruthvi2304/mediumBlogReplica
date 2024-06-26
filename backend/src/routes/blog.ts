import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@pruthvi2304/medium-common-app"; 

export const blogRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	},
    Variables: {
        userId: string
    }
  }>();

  blogRouter.use('*', async (c, next) => {
	const jwt = c.req.header('Authorization');
	if(!jwt){
		c.status(401);
		return c.json({ error: 'Unauthorized Access' });
	}

	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);

	if(!payload){
		c.status(401);
		c.json({ error: 'Unauthorized Access' });
	}

	c.set('userId', payload.id);
	await next();
})


blogRouter.get('/id/:id', async (c) => {
	const id = c.req.param('id');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	console.log(id);
	const post = await prisma.posts.findUnique({
		where: {
			id
		},
        select: {
            title: true,
            content: true,
            author: {
                select: {
                    name: true
                }
            }
        }
	});
 	return c.json(post);
})

blogRouter.post('/', async (c) => {
        const userId = c.get('userId');
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const { success } = createPostInput.safeParse(body);
        if(!success)
        {
            c.status(400);
		    return c.json({ error: "invalid input" });
        }
        const post = await prisma.posts.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: userId
            }
        });
        return c.json({
            id: post.id
        });
})

blogRouter.put('/update', async (c) => {
        const userId = c.get('userId');
        const prisma = new PrismaClient({
            datasourceUrl: c.env?.DATABASE_URL	,
        }).$extends(withAccelerate());
    
        const body = await c.req.json();
        const {success } = updatePostInput.safeParse(body);
        if(!success) {
            c.status(400);
		    return c.json({ error: "invalid input" });
        }
        try{
            const updatedLog = await prisma.posts.update({
                where: {
                    id: body.id,
                    authorId: userId
                },
                data: {
                    title: body.title,
                    content: body.content
                }
            });    
            return c.text("Record updated successfully");
        }catch (error : any) {
            return c.text(error);
        }
})

blogRouter.get('/bulk', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const blogs = await prisma.posts.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            published: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    });
	return c.json({blogs});
}) 
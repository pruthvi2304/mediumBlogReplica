import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput} from "@pruthvi2304/medium-common-app"


export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL : string,
		JWT_SECRET: string
	},
	Variables:{
		userId : string
		prisma : string
	}
}>();


userRouter.post('signup', async (c) => {
    const prisma = new PrismaClient({
  	  datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate())
	const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	try {
		const user = await prisma.user.create({
			data: {
				name: body.name,
				email: body.email,
				password: body.password
			}
		})
		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

		return c.json({ jwt })
	} catch (err) {
		return c.json({ err }, 403);
	}
})

userRouter.post('signin', async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
	if (!success) {
		c.status(400);
		return c.json({ error: "invalid input" });
	}
	const user = await prisma.user.findUnique({
		where: {
			email: body.email
		}
	});

	if(!user){
		c.status(403);
		return c.json({ error: "User not found"});
	}
	
	const jwt = await sign({ id : user.id}, c.env.JWT_SECRET);
	return c.json({ jwt });

})

userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body = await c.req.json();
  
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });
  
    const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  
    return c.json({
      jwt: token
    })
})
  
userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
    //@ts-ignore
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const user = await prisma.user.findUnique({
        where: {
            email: body.email,
    password: body.password
        }
    });

    if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ jwt });
})

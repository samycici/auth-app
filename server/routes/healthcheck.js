import { Router } from 'express'

const healthRouter = new Router()

healthRouter.get('/', async (_req, res, _next) => {
	const healthcheck = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now()
	};
	try {
		res.send();
	} catch (e) {
		healthcheck.message = e;
		res.status(503).send();
	}
});

// export router with all routes included
export default healthRouter;

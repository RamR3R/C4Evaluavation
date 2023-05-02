const rateLimit = require("express-rate-limit");

const accessLimiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 mins
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Max Request Limit Has Been Exceeded Please try after 5 mins',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

module.exports = accessLimiter;
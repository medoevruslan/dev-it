const whitelist = ['http://localhost:4200'];

export const corsOptions = {
  origin: function (origin: string, callback: (...args: unknown[]) => void) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

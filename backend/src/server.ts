import app from "./app";

const PORT = process.env.PORT || 5000;

const startServer = (): void => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
};

export default startServer;
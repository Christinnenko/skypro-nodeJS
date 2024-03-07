const http = require("http");
const getUsers = require("./src/modules/users");
const PORT = process.env.PORT || 3003;

const server = http.createServer((request, response) => {
  const url = new URL(request.url, "http://127.0.0.1");

  if (url.searchParams.has("hello")) {
    const name = url.searchParams.get("hello");
    if (name) {
      response.statusMessage = "OK";
      response.writeHead(200, { "Content-Type": "text/plain" });
      response.end(`Hello, ${name}.`);
    } else {
      response.writeHead(400, { "Content-Type": "text/plain" });
      response.end("Enter a name");
    }
    return;
  }

  if (url.searchParams.has("users")) {
    response.statusMessage = "OK";
    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(getUsers()));
    response.end();
    return;
  }

  if (url.search === "") {
    response.statusMessage = "OK";
    response.writeHead(200, { "Content-Type": "text/plain" });
    response.end("Hello, World!");
    return;
  }

  response.statusCode = 500;
  response.end();
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Сервер запущен по адресу http://127.0.0.1:${PORT}`);
});

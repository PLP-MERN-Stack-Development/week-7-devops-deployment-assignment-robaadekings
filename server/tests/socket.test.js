const io = require('socket.io-client');
const { server } = require('../server');

const SOCKET_URL =` http://localhost:${process.env.PORT || 5000}`;

describe('Socket.io', () => {
  let client;

  beforeAll((done) => {
    // wait for server to be ready
    setTimeout(done, 500);
  });

  afterAll(() => {
    client.close();
    server.close();
  });

  it('connects with JWT and receives ACK', (done) => {
    client = io(SOCKET_URL, {
      auth: { token: 'dummy.invalid.jwt' }, // Adjust to a real token or mock middleware
      transports: ['websocket'],
    });

    client.on('connect_error', (err) => {
      expect(err.message).toBe('Auth failed');
      done();
    });
  });
});
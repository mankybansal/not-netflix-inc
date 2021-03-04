export default {
  default: {
    get: jest.fn().mockImplementation(() => Promise.resolve({ data: {} }))
  },
  get: jest.fn(() => Promise.resolve({ data: {} }))
};

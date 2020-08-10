import handler from './handler-lib';
import { APIGatewayProxyEvent } from 'aws-lambda';

describe('Handler', () => {
  it('should call the lambda which has been passed in', async () => {
    const mockLambda = jest.fn();

    const stubHandler = handler(mockLambda);
    await stubHandler({} as APIGatewayProxyEvent);

    expect(mockLambda).toHaveBeenCalledTimes(1);
  });

  it('should return a 200 status code if there is no exception', async () => {
    const stubBody = 'true';
    const mockLambda = jest.fn().mockResolvedValue(stubBody);

    const stubHandler = handler(mockLambda);
    const result = await stubHandler({} as APIGatewayProxyEvent);

    expect(result.statusCode).toBe(200);
    expect(result.body).toContain(stubBody);
  });

  it('should return a 500 status code if there is an exception', async () => {
    const mockLambda = jest.fn().mockRejectedValue(false);

    const stubHandler = handler(mockLambda);
    const result = await stubHandler({} as APIGatewayProxyEvent);

    expect(result.statusCode).toBe(500);
  });
});

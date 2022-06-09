import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  //context is incoming request
  // never = > this value is never gonna used
  (data: never, context: ExecutionContext) => {
    //Data is any data is provided when we make use of the current user , @currentUser(anything)
    //As wrapper to the incoming request , works with http , graphql , grpc, any protocol
    //Get the request coming to app
    const request = context.switchToHttp().getRequest();
    // request.session.userId;
    //The challenge starts here, the userservice is part of dependency injection
    // We cannot use the Dependency injection with the decorator
    //decorator Can't reach the DI system
    return request.currentUser;
  },
);

//To Solve the problem
// Create interceptor called currentUserInterceptor ( it can read the dependency injection system)

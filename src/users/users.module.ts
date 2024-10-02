import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUserMiddleware } from 'src/middlewares/validate-user.middleware';

@Module({
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    // consumer
    // .apply(ValidateUserMiddleware)
    // .forRoutes({
    //   path: 'users/:id',
    //   method: RequestMethod.GET
    // });
    
    consumer
    .apply(ValidateUserMiddleware)
    .exclude({
      path: 'users',
      method: RequestMethod.POST
    })
    .forRoutes(UsersController);
  }
}

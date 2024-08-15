import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'TASKMANAGEMENTAPP',
    });
  }

  async validate(payload: JwtPayload) {
    // This function is called whenever a valid JWT is provided
    // Log the decoded payload for debugging
    return { userId: payload.sub, email: payload.email };
  }
}

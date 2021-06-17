import { Strategy, Profile } from 'passport-facebook';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { fbCredentials } from './constants';
import { UsersService } from '../users/users.service';

@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      clientID: fbCredentials.clientID,
      clientSecret: fbCredentials.clientSecret,
      callbackURL: 'http://localhost:3000/auth/facebook/redirect',
    });
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (error: any, user?: any, info?: any) => void,
  ) {
    const user = {
      username: profile.displayName,
      oauthID: profile.id,
    };
    await this.usersService.findOrCreateOauthUser(user.username, user.oauthID);
    done(null, user);
  }
}

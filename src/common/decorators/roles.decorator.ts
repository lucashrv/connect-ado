import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ('INSTITUTION' | 'ADOPTER' | 'CHILD')[]) =>
  SetMetadata(ROLES_KEY, roles);

import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { PG_CONNECTION } from '../constants';
import * as schema from '../drizzle/schema';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PG_CONNECTION) private conn: NodePgDatabase<typeof schema>,
  ) {}

  async findAll() {
    return this.conn.query.users.findMany({
      columns: {
        id: true,
        name: true,
      },
      with: {
        posts: {
          with: {
            comments: {
              columns: {
                id: true,
                text: true,
                createdAt: true,
              },
            },
          },
          columns: {
            id: true,
            title: true,
          },
        },
      },
    });
  }
}

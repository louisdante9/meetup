import { NOT_FOUND, UNAUTHORIZED } from 'http-status-codes';
import { Group } from '../models/index';

export class GroupRepository {
  constructor() {}

  /**
   * Creates a use group
   *
   * @param {{ [key: string]: any }} groupData
   * @returns
   *
   * @memberOf GroupRepository
   */
  public async create(groupData: { [key: string]: any }) {
    try {
      const group = await Group.create(groupData);
      return [group, null];
    } catch (error) {
      return [null, error];
    }
  }

  /**
   * Updates a group
   *
   * @param {{ [key: string]: any }} groupData
   * @returns
   *
   * @memberOf GroupRepository
   */
  public async update({ id, user_id, name }: { [key: string]: any }) {
    try {
      const group = await Group.findByPk(id);

      if (group) {
        if (group.user_id === user_id) {
          group.update({ name });
          group.reload();
          return [group, null];
        }

        return [
          null,
          {
            status: UNAUTHORIZED,
            message: 'Not authorised to update this group',
          },
        ];
      }
      return [null, { status: NOT_FOUND, message: 'Group not found' }];
    } catch (error) {
      return [null, error];
    }
  }
}
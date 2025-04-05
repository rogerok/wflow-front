import { UserResponseType } from '../../api/user/models/user';
import { RolesConstant } from '../../const/roles';
import { UserService } from './userService';

const mockUser: UserResponseType = {
  firstName: 'John Doe',
  email: 'john@example.com',
  createdAt: '12.01.2021',
  lastName: null,
  middleName: null,
  pseudonym: {
    firstName: null,
    lastName: null,
  },
  socialLinks: {
    instagram: null,
    telegram: null,
    tiktok: null,
    vk: null,
  },
  bornDate: null,
};

vi.mock('../../stores/request/RequestStore', () => {
  return {
    RequestStore: vi.fn().mockImplementation(() => ({
      call: vi.fn().mockResolvedValue({ data: mockUser }),
    })),
  };
});

describe('UserService test', () => {
  let service: UserService;

  beforeEach(() => {
    service = new UserService();
  });

  it('should init properly', async () => {
    expect(service.userData).toBe(null);
    expect(service.role).toBe(RolesConstant.Visitor);
    expect(service.isAuth).toBe(false);
  });

  it('should fetch data', async () => {
    await service.fetchUser('123');

    expect(service.userData).toEqual(mockUser);
    expect(service.role).toBe(RolesConstant.User);
    expect(service.isAuth).toBe(true);
  });

  it('should clear user data', async () => {
    await service.fetchUser('123');
    service.clearUserData();

    expect(service.userData).toBe(null);
    expect(service.role).toBe(RolesConstant.Visitor);
    expect(service.isAuth).toBe(false);
  });
});

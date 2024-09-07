import { UserAccount } from '../types/User'
import { getUserEmail } from '../utils/jwt'

export const isAdmin = (accounts: UserAccount[]) => {
  const userEmail = getUserEmail();
  const user = accounts.find(user => user.email === userEmail);
  const isAdmin = user && user.role === 'admin';
  return isAdmin as boolean;
}

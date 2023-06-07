import bcrypt from "bcryptjs";

/**
 * Hashes a password using bcrypt.
 *
 * @param {string} password - The password to be hashed.
 * @returns {Promise<string>} - A promise that resolves with the hashed password.
 */
export async function hashPassword(password) {
  const hash = await bcrypt.hash(password, 10);
  return hash;
}

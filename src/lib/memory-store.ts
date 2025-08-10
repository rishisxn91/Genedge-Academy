import bcrypt from 'bcryptjs'

interface User {
  id: string
  name: string
  email: string
  password: string
  role: string
  createdAt: Date
}

class MemoryStore {
  private users: Map<string, User> = new Map()
  private nextId = 1

  constructor() {
    // Initialize with admin user
    this.createAdminUser()
  }

  private async createAdminUser() {
    const adminPassword = await bcrypt.hash('admin123', 12)
    const adminUser: User = {
      id: 'admin-1',
      name: 'Admin User',
      email: 'admin@genedge.ac',
      password: adminPassword,
      role: 'ADMIN',
      createdAt: new Date()
    }
    this.users.set(adminUser.email, adminUser)
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<Omit<User, 'password'>> {
    if (this.users.has(data.email)) {
      throw new Error('User with this email already exists')
    }

    const hashedPassword = await bcrypt.hash(data.password, 12)
    const user: User = {
      id: `user-${this.nextId++}`,
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: 'STUDENT',
      createdAt: new Date()
    }

    this.users.set(user.email, user)
    
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return this.users.get(email) || null
  }

  async findUserById(id: string): Promise<Omit<User, 'password'> | null> {
    for (const user of this.users.values()) {
      if (user.id === id) {
        const { password, ...userWithoutPassword } = user
        return userWithoutPassword
      }
    }
    return null
  }

  async verifyPassword(email: string, password: string): Promise<boolean> {
    const user = this.users.get(email)
    if (!user) return false
    return bcrypt.compare(password, user.password)
  }

  async getAllUsers(): Promise<Omit<User, 'password'>[]> {
    return Array.from(this.users.values()).map(user => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })
  }

  async getUserCount(): Promise<number> {
    return this.users.size
  }
}

export const memoryStore = new MemoryStore()

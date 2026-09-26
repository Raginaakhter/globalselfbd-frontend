/** Dashboard page the signed-in user may open, as returned by the backend in `data.menu`. */
export interface MenuItem {
  key: string;
  label: string;
  path: string;
  permission: string;
}

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  avatar?: string | null;
  /** Bangladeshi mobile number, empty when not set. */
  phone: string;
  status: string;
  /** Lower-case role name, e.g. "admin", "manager", "salesman", "customer". */
  role: string;
  /** Role name as shown by the backend, e.g. "Salesman". */
  roleName: string;
  roleId: string | null;
  createdAt: string;
}

export interface ClientSession {
  user: SessionUser;
  permissions: string[];
  menu: MenuItem[];
  accessToken: string;
}

/** User as returned by the backend in login / register / GET and PUT /api/auth/me. */
export interface BackendSessionUser {
  _id: string;
  fullName: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
  status: string;
  role?: { _id: string; name: string; status: string } | null;
  createdAt: string;
}

/** Backend user -> the shape the app keeps in AuthContext. */
export function toSessionUser(u: BackendSessionUser): SessionUser {
  const roleName = u.role?.name ?? "Customer";
  return {
    id: u._id,
    name: u.fullName,
    email: u.email,
    avatar: u.avatarUrl || null,
    phone: u.phone ?? "",
    status: u.status,
    role: roleName.toLowerCase(),
    roleName,
    roleId: u.role?._id ?? null,
    createdAt: u.createdAt,
  };
}

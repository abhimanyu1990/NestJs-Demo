export const PermissionsList = [
    {
        "name":"Create User",
        "value":"CREATE_USER",
        "description":"User having this authroity can create a new user"
    },
    {
        "name":"View User",
        "value":"VIEW_USER",
        "description":"User having this authroity can fetch a user"
    },
    {
        "name":"List User",
        "value":"LIST_USER",
        "description":"User having this authroity can search and list user"
    },
    {
        "name":"Update User",
        "value":"UPDATE_USER",
        "description":"User having this authroity can update user"
    },
    {
        "name":"Delete User",
        "value":"DELETE_USER",
        "description":"User having this authroity can delete user"
    },

    {
        "name":"Create Permission",
        "value":"CREATE_PERMISSION",
        "description":"User having this authroity can create a new permission"
    },
    {
        "name":"View Permission",
        "value":"VIEW_PERMISSION",
        "description":"User having this authroity can fetch a permission"
    },
    {
        "name":"List Permission",
        "value":"LIST_PERMISSION",
        "description":"User having this authroity can search and list permission"
    },
    {
        "name":"Update Permission",
        "value":"UPDATE_PERMISSION",
        "description":"User having this authroity can update permission"
    },
    {
        "name":"Delete Permission",
        "value":"DELETE_PERMISSION",
        "description":"User having this authroity can delete permission"
    },

    {
        "name":"Create Role",
        "value":"CREATE_ROLE",
        "description":"User having this authroity can create a new role"
    },
    {
        "name":"View Role",
        "value":"VIEW_ROLE",
        "description":"User having this authroity can fetch a role"
    },
    {
        "name":"List Role",
        "value":"LIST_ROLE",
        "description":"User having this authroity can search and list role"
    },
    {
        "name":"Update Role",
        "value":"UPDATE_ROLE",
        "description":"User having this authroity can update role"
    },
    {
        "name":"Delete Role",
        "value":"DELETE_ROLE",
        "description":"User having this authroity can delete role"
    }

]


export const RolesList = [
    {
        "name":"Admin",
        "value":"ROLE_ADMIN",
        "description":"Admin roles",
        "permissionValueList" :['CREATE_USER',
                                'VIEW_USER',
                                'LIST_USER',
                                'UPDATE_USER',
                                'DELETE_USER',
                                'CREATE_ROLE',
                                'UPDATE_ROLE',
                                'VIEW_ROLE',
                                'LIST_ROLE',
                                'DELTE_ROLE',
                                'CREATE_PERMISSION',
                                'UPDATE_PERMISSION',
                                'VIEW_PERMISSION',
                                'LIST_PERMISSION',
                                'DELTE_PERMISSION']
    },

    {
        "name":"Role User",
        "value":"ROLE_USER",
        "description":"User roles",
        "permissionValueList" :['CREATE_USER',
                                'VIEW_USER',
                                'UPDATE_USER',
                                'DELETE_USER',
                                ]
    }
]
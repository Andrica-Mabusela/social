import { ResourceAction } from './resource.action';

export const Authentication = {
    Login: new ResourceAction('api/auth/login','post'),
    Register: new ResourceAction('api/auth/register','post'),
    ResetPassword: new ResourceAction('api/auth/register','post')
}

export const Post = {
    Create: new ResourceAction('api/post/create', 'post'),
    Remove: new ResourceAction('api/post/remove', 'delete'),
    GetAll: new ResourceAction('api/post/get'),
    GetOne: new ResourceAction('api/post/get'),
    Edit: new ResourceAction('api/post/edit', 'put'),
    Like: new ResourceAction('api/post/like', 'put'),
    Share: new ResourceAction('api/post/share', 'put'),
}

export const Story = {
    Create: new ResourceAction('api/story/create', 'post'),
    Remove: new ResourceAction('api/story/remove', 'delete'),
    GetAll: new ResourceAction('api/story/get'),
    GetOne: new ResourceAction('api/story/get')
}

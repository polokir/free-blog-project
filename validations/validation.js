import {body} from 'express-validator';

export const loginValidation = [
    body('email').isEmail(),
    body('password').isLength({min:8})
]

export const registerValid = [
    body('email').isEmail(),
    body('password').isLength({min:8}),
    body('fullName').isLength({min:2}),
    body('avatarUrl').optional().isURL()
];

export const postCreateValid = [
    body('title').isLength({min:2}).isString(),
    body('text').isLength({min:10}).isString(),
    body('tags').optional().isString(),
    body('imageURL').optional().isString(),
]

export default registerValid;
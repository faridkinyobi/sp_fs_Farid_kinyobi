import z from 'zod';
import { SchemaZodAut } from './authValidate';
import { SchemaZodRegister } from './registerValidate';
import { SchemaZodProject } from './projectValidate';
import { SchemaZodTask } from './taskValidate';
import { SchemaZodSetting } from './settingValidate';

export type IAuthFormValidate = z.infer<typeof SchemaZodAut>;
export type IregisterFormValidate = z.infer<typeof SchemaZodRegister>;

export type IprojectFormValidate = z.infer<typeof SchemaZodProject>;
export type ItaskFormValidate = z.infer<typeof SchemaZodTask>;

export type IsettingFormValidate = z.infer<typeof SchemaZodSetting>;

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { UserGuard } from './guards/user.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [AuthGuard ]  // Protège la route profile avec UserGuard
  },
  {
    path: 'user-home',
    loadChildren: () => import('./user-home/user-home.module').then(m => m.UserHomePageModule),
    canActivate: [UserGuard] // Protège la route user-home avec UserGuard
  },
  {
    path: 'admin-home',
    loadChildren: () => import('./admin-home/admin-home.module').then(m => m.AdminHomePageModule),
    canActivate: [AdminGuard] // Protège la route admin-home avec AdminGuard
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'users',
    loadChildren: () => import('./manage-users/manage-users.module').then( m => m.ManageUsersPageModule),canActivate: [AdminGuard]
  },
  {
    path: 'add-user',
    loadChildren: () => import('./add-user/add-user.module').then( m => m.AddUserPageModule), canActivate: [AdminGuard]
  },
  {
    path: 'edit-user/:id',
    loadChildren: () => import('./edit-user/edit-user.module').then( m => m.EditUserPageModule), canActivate: [AdminGuard]
  },
  {
    path: 'equipment',
    loadChildren: () => import('./pages/equipment/equipment.module').then( m => m.EquipmentPageModule) , canActivate: [AdminGuard]
  },
   
  {
    path: 'maps',
    loadChildren: () => import('./pages/equipment-map/equipment-map.module').then( m => m.EquipmentMapPageModule) , canActivate:[AuthGuard ]
  },
  {
    path: 'edit-equipment',
    loadChildren: () => import('./pages/edit-equipment/edit-equipment.module').then( m => m.EditEquipmentPageModule)  , canActivate:[AuthGuard ]
  },
  {
    path: 'edit-equipment/:id',
    loadChildren: () => import('./pages/edit-equipment/edit-equipment.module').then( m => m.EditEquipmentPageModule) ,canActivate: [AdminGuard]
  
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

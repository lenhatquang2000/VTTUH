import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../components/layouts/main-layoutcomponent/main-layout.component';
import { HomeComponent } from '../components/home/homecomponent/home.component';
import { SiteSettingComponent } from '../components/setting/site-setting/site-setting.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
        ]
    },
    {
        path: 'site-setting',
        children: [
            { path: '', component: SiteSettingComponent },
        ]
    }
];

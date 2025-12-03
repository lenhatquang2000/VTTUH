import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../components/layouts/main-layoutcomponent/main-layout.component';
import { HomeComponent } from '../components/home/homecomponent/home.component';
import { SiteSettingComponent } from '../components/setting/site-setting/site-setting.component';
import { AboutUsComponent } from '../components/about-us/about-us-component/about-us.component';

export const routes: Routes = [
    {
        path: '',
        component: MainLayoutComponent,
        data: { name: 'main-layout' },
        children: [
            { path: '', component: HomeComponent, data: { name: 'home' } },
        ]
    },
    {
        path: 'site-setting',
        data: { name: 'site-setting-root' },
        children: [
            { path: '', component: SiteSettingComponent, data: { name: 'site-setting' } },
        ]
    },
    {
        path: 'about-us',
        component: MainLayoutComponent,
        data: { name: 'about-us-layout' },
        children: [
            { path: '', component: AboutUsComponent, data: { name: 'about-us' } },
        ],
    }
];

import { Routes } from '@angular/router';
import { MainLayoutComponent } from '../components/layouts/main-layoutcomponent/main-layout.component';
import { HomeComponent } from '../components/home/homecomponent/home.component';
import { SiteSettingComponent } from '../components/setting/site-setting/site-setting.component';
import { AboutUsComponent } from '../components/about-us/about-us-component/about-us.component';
import { ExpertComponent } from '../components/expert/expert-componet/expert.component';

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
        path: 'about-us',
        component: MainLayoutComponent,
        data: { name: 'about-us-layout' },
        children: [
            { path: '', component: AboutUsComponent, data: { name: 'about-us' } },
        ],
    },
    {
        path: 'experts',
        component:MainLayoutComponent,
        children: [
            { path: '', component: ExpertComponent, data: { name: 'experts'}},
        ]
    }
];

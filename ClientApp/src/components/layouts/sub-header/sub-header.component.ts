import { Component, HostListener, inject, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime, filter } from 'rxjs/operators';

@Component({
    selector: 'sub-header',
    templateUrl: './sub-header.component.html',
    styleUrl: './sub-header.component.css',
    standalone: true,
    imports: [CommonModule]
})
export class SubHeaderComponent implements OnInit, OnDestroy {
    private router = inject(Router);
    private cdr = inject(ChangeDetectorRef);
    isDropdownOpen = false;
    activeMenuItem: string | null = null;
    isMobile = false;
    private resizeSubscription?: Subscription;

    menuItems = [
        { id: 'home', label: 'Trang chủ', route: '/', name: 'home' },
        { id: 'intro', label: 'Giới thiệu', route: '/about-us', name: 'about-us' },
        { id: 'experts', label: 'Đội ngũ chuyên gia', route: '/experts', name: 'experts' },
        { id: 'appointment', label: 'Đặt lịch khám bệnh', route: '/appointment' },
        { id: 'news', label: 'Tin tức', route: '/news' }
    ];

    dropdownItems = [
        { id: 'patient', label: 'Dành cho bệnh nhân', route: '/patient', icon: 'bi-heart-pulse' },
        { id: 'staff', label: 'Dành cho cán bộ y tế', route: '/staff', icon: 'bi-person-badge' },
        { id: 'online', label: 'Dịch vụ trực tuyến', route: '/online-services', icon: 'bi-globe' },
        { id: 'vaccination', label: 'Tiêm chủng', route: '/vaccination', icon: 'bi-shield-plus' },
        { id: 'recruitment', label: 'Tuyển dụng', route: '/recruitment', icon: 'bi-briefcase-fill' },
        { id: 'invoice', label: 'Tra cứu hóa đơn điện tử', route: '/invoice', icon: 'bi-receipt' },
        { id: 'events', label: 'Sự kiện', route: '/events', icon: 'bi-stars' }
    ];

    //#region Angular Lifecycle

    ngOnInit(): void {
        this.checkMobile();
        this.resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(100))
            .subscribe(() => {
                this.checkMobile();
            });

        // Listen to router events to set active menu item
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                let current = this.router.routerState.root;
                while (current.firstChild) {
                    current = current.firstChild;
                }
                const name = current.snapshot.data['name'];
                // Debug logs (you can remove in production):
                // console.log("CURRENT ROUTE NAME =", name);
                this.setActiveByRouteName(name);
                // Very important: since router events might be out of Angular zone,
                // need to trigger a change detection or use markForCheck to ensure UI updates
                this.cdr.detectChanges();
            });

        // On initial render: also set active menu based on current route
        let current = this.router.routerState.root;
        while (current.firstChild) current = current.firstChild;
        const name = current.snapshot.data['name'];
        this.setActiveByRouteName(name);
    }

    setActiveByRouteName(routeName: string): void {
        // console.log('[SubHeaderComponent] setActiveByRouteName called with routeName:', routeName);
        const matched = this.menuItems.find(item => item.name === routeName);
        // console.log('[SubHeaderComponent] Matched menuItem:', matched);

        if (matched) {
            this.activeMenuItem = matched.id;
            // console.log('[SubHeaderComponent] Set activeMenuItem to:', matched.id);
        } else {
            // Edge case: if top-level route (routeName nullish), try to match by route ""
            if (routeName === '' || routeName == null) {
                const home = this.menuItems[0];
                if (home) this.activeMenuItem = home.id;
            }
            // console.log('[SubHeaderComponent] No matching menuItem found for routeName:', routeName);
            // Optionally clear
        }
    }

    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }

    //#endregion

    //#region Dropdown Logic

    closeDropdown(): void {
        this.isDropdownOpen = false;
    }

    toggleDropdown(event: Event): void {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.menu-item-dropdown')) {
            this.closeDropdown();
        }
    }

    //#endregion

    //#region Menu & Navigation

    onMenuItemClick(item: { id?: string; route?: string }): void {
        if (item.id) {
            this.activeMenuItem = item.id;
        }
        this.closeDropdown();
        if (item.route) {
            this.router.navigate([item.route]);
        }
        // Immediately trigger change detection to assure the .active class is seen by Angular
        this.cdr.detectChanges();
    }

    isActive(itemId: string): boolean {
        // Remove debug log for clarity in template function
        return this.activeMenuItem === itemId;
    }

    //#endregion

    //#region Utilities

    getMenuIcon(id: string): string {
        const iconMap: { [key: string]: string } = {
            'intro': 'bi-info-circle',
            'experts': 'bi-people-fill',
            'appointment': 'bi-calendar-check',
            'news': 'bi-newspaper'
        };
        return iconMap[id] || 'bi-circle';
    }

    private checkMobile(): void {
        this.isMobile = window.innerWidth < 576;
    }

    //#endregion
}
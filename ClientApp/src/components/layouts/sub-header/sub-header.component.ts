import { Component, HostListener, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { fromEvent, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
    selector: 'sub-header',
    templateUrl: './sub-header.component.html',
    styleUrl: './sub-header.component.css',
    standalone: true,
    imports: [CommonModule]
})
export class SubHeaderComponent implements OnInit, OnDestroy {
    private router = inject(Router);
    isDropdownOpen = false;
    activeMenuItem: string | null = null;
    isMobile = false;
    private resizeSubscription?: Subscription;
    
    menuItems = [
        { id: 'home', label: 'Trang chủ', route: '/' },
        { id: 'intro', label: 'Giới thiệu', route: '/about-us' },
        { id: 'experts', label: 'Đội ngũ chuyên gia', route: '/experts' },
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
    
    ngOnInit(): void {
        this.checkMobile();
        // Lắng nghe sự kiện resize
        this.resizeSubscription = fromEvent(window, 'resize')
            .pipe(debounceTime(100))
            .subscribe(() => {
                this.checkMobile();
            });
    }
    
    ngOnDestroy(): void {
        this.resizeSubscription?.unsubscribe();
    }
    
    private checkMobile(): void {
        this.isMobile = window.innerWidth < 576; // Bootstrap sm breakpoint
    }
    
    getMenuIcon(id: string): string {
        const iconMap: { [key: string]: string } = {
            'intro': 'bi-info-circle',
            'experts': 'bi-people-fill',
            'appointment': 'bi-calendar-check',
            'news': 'bi-newspaper'
        };
        return iconMap[id] || 'bi-circle';
    }
    

    toggleDropdown(event: Event): void {
        event.stopPropagation();
        this.isDropdownOpen = !this.isDropdownOpen;
    }

    closeDropdown(): void {
        this.isDropdownOpen = false;
    }

    onMenuItemClick(item: { id?: string; route?: string }): void {
        // Set active item
        if (item.id) {
            this.activeMenuItem = item.id;
        }
    
        this.closeDropdown();
    
        if (item.route) {
            this.router.navigate([item.route]);
        }
    }
    
    isActive(itemId: string): boolean {
        return this.activeMenuItem === itemId;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: Event): void {
        const target = event.target as HTMLElement;
        if (!target.closest('.menu-item-dropdown')) {
            this.closeDropdown();
        }
    }
}
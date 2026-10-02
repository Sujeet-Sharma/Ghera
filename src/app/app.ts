import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // ensure we reset scroll to top on route change
        // try multiple fallbacks and a small delay so new view layout is applied
        setTimeout(() => {
          // window
          try {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          } catch (e) {
            (document.documentElement as any).scrollTop = 0;
            (document.body as any).scrollTop = 0;
          }

          // main content container
          const container = document.querySelector('.main-content') as HTMLElement | null;
          if (container) {
            try { container.scrollTop = 0; } catch {}
            try { (container as any).scrollTo && (container as any).scrollTo(0, 0); } catch {}
          }

          // reset any scrollable elements (e.g., grids, modals) to top
          try {
            const elements = Array.from(document.querySelectorAll<HTMLElement>('*'));
            elements.forEach(el => {
              try {
                const style = window.getComputedStyle(el);
                const overflowY = style.overflowY;
                const overflow = style.overflow;
                if ((overflowY === 'auto' || overflowY === 'scroll' || overflow === 'auto' || overflow === 'scroll') && el.scrollHeight > el.clientHeight) {
                  el.scrollTop = 0;
                }
              } catch {}
            });
          } catch {}
        }, 50);
      }
    });
  }
}

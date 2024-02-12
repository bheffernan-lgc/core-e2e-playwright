import AxeBuilder from '@axe-core/playwright';
import { Page } from '@playwright/test';
import { inject, singleton } from 'tsyringe';

@singleton()
export class AxeHelper {
  constructor(@inject('page') public page: Page) {}

  async generateAxeReport() {
    return new AxeBuilder({ page: this.page })
      .withTags(['wcag2aa'])
      .options({ iframes: false })
      .exclude('.ot-floating-button__back')
      .exclude('.ot-floating-button__close')
      .disableRules(['color-contrast'])
      .analyze();
  }
}

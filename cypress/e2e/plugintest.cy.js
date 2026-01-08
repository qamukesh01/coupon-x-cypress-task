describe('Coupon X Automation Task', () => {

  it('should login, install plugin, and verify widget', () => {
    // --- STEP 1: LOGIN ---
    cy.visit('http://qamukesh.local:10003/wp-admin', { timeout: 60000 });
    cy.get('#user_login').type('qamukesh');
    cy.get('#user_pass').type('Test123$');
    cy.get('#wp-submit').click();

    // Verify login success
    cy.get('#adminmenu', { timeout: 12000 }).should('be.visible');

    // --- STEP 2: INSTALL & ACTIVATE ---
    cy.visit('http://qamukesh.local:10003/wp-admin/plugin-install.php?s=coupon-x-discount-pop-up&tab=search&type=term');
    
    // Find and Install
    cy.get('a[data-slug="coupon-x-discount-pop-up"].install-now', { timeout: 30000 })
      .should('be.visible')
      .click();
    
    // Wait for the "Activate" button and click it
    cy.get('a[data-slug="coupon-x-discount-pop-up"].activate-now', { timeout: 30000 })
      .should('be.visible')
      .click();

    // // --- NAVIGATE TO PLUGIN ---
    cy.visit('/wp-admin/admin.php?page=couponx');
    cy.wait(2000); // Give the dashboard time to load its stats

    // Click on 'Create New Widget' button
    cy.contains('Create New Widget', { timeout: 10000 })
      .should('be.visible')
      .click({ force: true });

    // Click Next
    cy.get('#next-button').should('be.visible').click();
    cy.wait(1500); 

    // Select 'Announcement Pop up'
    cy.contains("Announcement Pop up - don't show a coupon code", { timeout: 10000 })
      .should('be.visible')
      .click();

    // Select 'Slide-in Pop up'
    cy.contains('Slide-in Pop up').should('be.visible').click();
    cy.wait(1000);

    // Click Next
    cy.get('#next-button').should('be.visible').click();
    cy.wait(1500);

    // Select 'open' from the dropdown
    cy.get('select[name="cx_settings[trigger][when]"].input-element', { timeout: 10000 })
      .should('be.visible')
      .select('open');
    
    cy.wait(1000);

    cy.get('#save-button').should('be.enabled').click();
   
    // --- STEP 4: WIDGET VERIFICATION ---
    cy.visit('http://qamukesh.local:10003/');

    cy.contains('Check out our latest collection', { timeout: 25000 }) // Wait for the widget to load
      .should('be.visible');
      cy.wait(5000);

    cy.get('.coupon-tab-close').click({ force: true }); // Click the close button
    cy.contains('Check out our latest collection').should('not.be.visible'); // Verify widget is gone
    cy.wait(5000);
  }); 
});
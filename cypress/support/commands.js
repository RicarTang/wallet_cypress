// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import restoreWalletJson from '../fixtures/data/restore_wallet.json'
import restoreWalletEle from '../fixtures/ele/restoreWalletEle.json'
import walletManageEle from "../fixtures/ele/walletManageEle.json";
import createWalletEle from "../fixtures/ele/createWalletEle.json";
import createWalletJson from "../fixtures/data/create_wallet.json";
// create wallet form
Cypress.Commands.add('createWalletForm', (title) => {
    cy.get(createWalletEle.createWallet).click()
    cy.url().should('contains', 'mnemonic-create-wallet')
    cy.get(createWalletEle.walletName).type(title.walletName)
    cy.get(createWalletEle.walletPassword).type(title.walletPassword)
    cy.get(createWalletEle.walletPasswordRepeat).type(title.walletPasswordRepeat)
    cy.get(createWalletEle.walletPasswordHint).type(title.passwordHint)
})

// restore wallet
Cypress.Commands.add('restoreWallet', () => {
    cy.visit('/')
    cy.viewport(375, 780)
    cy.get(restoreWalletEle.restoreWallet).click()
    cy.url().should('contains', 'mnemonic-recover-wallet')
    cy.get(restoreWalletEle.walletMnemonic).type(restoreWalletJson.restoreSuccess.walletMnemonic)
    cy.get(restoreWalletEle.walletIdentityName).type(restoreWalletJson.restoreSuccess.walletIdentityName)
    cy.get(restoreWalletEle.walletPassword).type(restoreWalletJson.restoreSuccess.walletPassword)
    cy.get(restoreWalletEle.walletPasswordRepeat).type(restoreWalletJson.restoreSuccess.walletPasswordRepeat)
    cy.get(restoreWalletEle.walletPasswordHint).type(restoreWalletJson.restoreSuccess.passwordHint)
    cy.get(restoreWalletEle.userAgreement).click()
    cy.get(restoreWalletEle.restoreWalletSubmit).should('not.be.disabled').click()
    cy.url().should('contains', 'home')

})
// delete identity wallet ??
Cypress.Commands.add('deleteIdentityWallet', () => {
    cy.visit('/')
    cy.url().should('contains', '/home')
    cy.viewport(375, 780)
    cy.get(walletManageEle.walletList).click()
    cy.get(walletManageEle.walletManage).click()
    cy.get(walletManageEle.identityManage).click()
    cy.get(walletManageEle.deleteIdentityWallet).click()
    cy.get(walletManageEle.alertConfirm).click()
    cy.get(walletManageEle.verifyPassword).type(restoreWalletJson.restoreSuccess.walletPassword)
    cy.get(walletManageEle.verifyPasswordConfirm).click()
})


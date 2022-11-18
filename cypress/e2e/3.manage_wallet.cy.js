import walletManageEle from '../fixtures/ele/walletManageEle.json'
import restoreWalletJson from '../fixtures/data/restore_wallet.json'

describe('Manage wallet', () => {
    before(() => {
        cy.restoreWallet()  // 前置，恢复钱包
    })
    after(()=>{
        cy.deleteIdentityWallet()  // 后置，删除身份钱包
    })
    context('identityWallet Manage', () => {
        // 导出身份钱包助记词
        it('identityWalletReportMnemonic', () => {
            cy.get(walletManageEle.walletList).click()
            cy.get(walletManageEle.walletManage).click()
            cy.get(walletManageEle.identityManage).click()
            cy.get(walletManageEle.identityWalletReportMnemonic).click()
            cy.get(walletManageEle.verifyPassword).type(restoreWalletJson.restoreSuccess.walletPassword)
            cy.get(walletManageEle.verifyPasswordConfirm).click()
            cy.url().should('contains','mnemonic-backup-tips?export=true')
        })
        it('test',()=>{
            cy.visit('/home')
            cy.get(walletManageEle.walletList).click()
            cy.get(walletManageEle.walletManage).click()
            cy.get(walletManageEle.identityManage).click()
            cy.get(walletManageEle.identityWalletReportMnemonic).click()
        })
    })
})
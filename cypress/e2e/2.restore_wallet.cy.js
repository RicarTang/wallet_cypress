import restoreWalletJson from '../fixtures/data/restore_wallet.json'
import restoreWalletEle from '../fixtures/ele/restoreWalletEle.json'
import walletManageEle from '../fixtures/ele/walletManageEle.json'

describe('Restore Wallet', () => {
    context('Form Validation', () => {
        beforeEach(() => {
            // cy.clearLocalStorage()
            cy.visit('/')
            cy.viewport(375, 780)

        })
        // 验证失败测试用例
        for (const i in restoreWalletJson) {
            if (i === 'restoreSuccess') {
                continue;
            } else {
                it(restoreWalletJson[i].title, () => {
                    cy.get(restoreWalletEle.restoreWallet).click()
                    cy.url().should('contains', 'mnemonic-recover-wallet')
                    cy.get(restoreWalletEle.walletMnemonic).type(restoreWalletJson[i].walletMnemonic)
                    cy.get(restoreWalletEle.walletIdentityName).type(restoreWalletJson[i].walletIdentityName)
                    cy.get(restoreWalletEle.walletPassword).type(restoreWalletJson[i].walletPassword)
                    cy.get(restoreWalletEle.walletPasswordRepeat).type(restoreWalletJson[i].walletPasswordRepeat)
                    cy.get(restoreWalletEle.walletPasswordHint).type(restoreWalletJson[i].passwordHint)
                    cy.get(restoreWalletEle.userAgreement).click()
                    cy.get(restoreWalletEle.restoreWalletSubmit).should('be.disabled')
                })
            }
        }
        it('不勾选用户协议恢复钱包', () => {
            cy.get(restoreWalletEle.restoreWallet).click()
            cy.url().should('contains', 'mnemonic-recover-wallet')
            cy.get(restoreWalletEle.walletMnemonic).type(restoreWalletJson.restoreSuccess.walletMnemonic)
            cy.get(restoreWalletEle.walletIdentityName).type(restoreWalletJson.restoreSuccess.walletIdentityName)
            cy.get(restoreWalletEle.walletPassword).type(restoreWalletJson.restoreSuccess.walletPassword)
            cy.get(restoreWalletEle.walletPasswordRepeat).type(restoreWalletJson.restoreSuccess.walletPasswordRepeat)
            cy.get(restoreWalletEle.walletPasswordHint).type(restoreWalletJson.restoreSuccess.passwordHint)

            cy.get(restoreWalletEle.restoreWalletSubmit).should('be.disabled')
        })
        // 恢复成功测试用例
        it(restoreWalletJson.restoreSuccess.title, () => {
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
            cy.get(walletManageEle.walletList).click()
            cy.get(walletManageEle.walletManage).click()
            cy.get(walletManageEle.identityManage).click()
            cy.get(walletManageEle.deleteIdentityWallet).click()
            cy.get(walletManageEle.alertConfirm).click()
            cy.get(walletManageEle.verifyPassword).type(restoreWalletJson.restoreSuccess.walletPassword)
            cy.get(walletManageEle.verifyPasswordConfirm).click()
        })


    })


})
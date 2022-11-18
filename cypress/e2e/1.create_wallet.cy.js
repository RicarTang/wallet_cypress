import createWalletJson from '../fixtures/data/create_wallet.json'
import createWalletEle from '../fixtures/ele/createWalletEle.json'

describe('Create Wallet', () => {
    context('Form Validation', () => {
        beforeEach(() => {
            // cy.clearLocalStorage()
            cy.visit('/')
            cy.viewport(375, 780)
        })
        // 表单验证成功测试用例
        it(createWalletJson.createSuccess.title, () => {
            cy.get(createWalletEle.createWallet).click()
            cy.url().should('contains', 'mnemonic-create-wallet')
            cy.get(createWalletEle.walletName).type(createWalletJson.createSuccess.walletName)
            cy.get(createWalletEle.walletPassword).type(createWalletJson.createSuccess.walletPassword)
            cy.get(createWalletEle.walletPasswordRepeat).type(createWalletJson.createSuccess.walletPasswordRepeat)
            cy.get(createWalletEle.walletPasswordHint).type(createWalletJson.createSuccess.passwordHint)
            cy.get(createWalletEle.userAgreement).click()
            cy.get(createWalletEle.createWalletSubmit).should('not.be.disabled').click()
            cy.url().should('contains', 'mnemonic-backup-tips')

        })
        // 表单验证失败测试用例
        for (const i in createWalletJson) {
            if (i === 'createSuccess') {
                continue;
            } else {
                it(createWalletJson[i].title, () => {
                    cy.get(createWalletEle.createWallet).click()
                    cy.url().should('contains', 'mnemonic-create-wallet')
                    cy.get(createWalletEle.walletName).type(createWalletJson[i].walletName)
                    cy.get(createWalletEle.walletPassword).type(createWalletJson[i].walletPassword)
                    cy.get(createWalletEle.walletPasswordRepeat).type(createWalletJson[i].walletPasswordRepeat)
                    cy.get(createWalletEle.walletPasswordHint).type(createWalletJson[i].passwordHint)
                    cy.get(createWalletEle.userAgreement).click()
                    cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
                })
            }
        }
        it('不勾选用户协议', () => {
            cy.get(createWalletEle.createWallet).click()
            cy.url().should('contains', 'mnemonic-create-wallet')
            cy.get(createWalletEle.walletName).type(createWalletJson.createSuccess.walletName)
            cy.get(createWalletEle.walletPassword).type(createWalletJson.createSuccess.walletPassword)
            cy.get(createWalletEle.walletPasswordRepeat).type(createWalletJson.createSuccess.walletPasswordRepeat)
            cy.get(createWalletEle.walletPasswordHint).type(createWalletJson.createSuccess.passwordHint)
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
        })

    })

})
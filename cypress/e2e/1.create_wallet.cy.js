import createWalletJson from '../fixtures/data/create_wallet.json'
import createWalletEle from '../fixtures/ele/createWalletEle.json'

describe('Create Wallet', () => {
    context('Form Validation', () => {
        beforeEach(() => {
            // cy.clearLocalStorage()
            cy.visit('/')
            cy.viewport(375, 780)
        })
        // 创建钱包成功测试用例
        it(createWalletJson.createSuccess.title, () => {
            cy.createWalletForm(createWalletJson.createSuccess)
            cy.get(createWalletEle.userAgreement).click()
            cy.get(createWalletEle.createWalletSubmit).should('not.be.disabled').click()
            cy.url().should('contains', 'mnemonic-backup-tips')

        })

        // WalletName大于12位字符
        it(createWalletJson.walletNameGt12.title, () => {
            cy.createWalletForm(createWalletJson.walletNameGt12)  // 填写表单信息
            cy.get(createWalletEle.userAgreement).click()  // 选中用户协议
            cy.get(createWalletEle.createWalletTextError.walletNameError).should(($text) => {
                // 断言错误信息
                expect($text.text()).to.eq(' The maximum length of the name is 12 ')
            })
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')  // 断言submit按钮状态
        })
        // WalletName为空格字符
        it(createWalletJson.walletNameIsSpace.title, () => {
            cy.createWalletForm(createWalletJson.walletNameIsSpace)
            cy.get(createWalletEle.userAgreement).click()
            cy.get(createWalletEle.createWalletTextError.walletNameError).should(($text) => {
                expect($text.text()).to.eq(' Please enter wallet name ')
            })
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
        })
        // walletPassword小于8位字符
        it(createWalletJson.walletPasswordLt8.title, () => {
            cy.createWalletForm(createWalletJson.walletPasswordLt8)
            cy.get(createWalletEle.userAgreement).click()
            cy.get(createWalletEle.createWalletTextError.walletPasswordError).should(($text) => {
                expect($text.text()).to.eq(' The password is at least 8 characters long ')
            })
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
        })
        // 不勾选用户协议
        it('不勾选用户协议', () => {
            cy.createWalletForm(createWalletJson.createSuccess)
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
        })
        // walletPassword大于30位字符
        it(createWalletJson.walletPasswordGt30.title, () => {
            cy.createWalletForm(createWalletJson.walletPasswordGt30)
            cy.get(createWalletEle.userAgreement).click()
            cy.get(createWalletEle.createWalletTextError.walletPasswordError).should(($text) => {
                expect($text.text()).to.eq(' The maximum length of the password is 30 ')
            })
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
        })
        // walletPassword两次密码不一致
        it(createWalletJson.walletPasswordDiscord.title, () => {
            cy.createWalletForm(createWalletJson.walletPasswordDiscord)
            cy.get(createWalletEle.userAgreement).click()
            cy.get(createWalletEle.createWalletTextError.walletPasswordError).should(($text) => {
                expect($text.text()).to.eq(' Two inputs don\'t match! ')
            })
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
        })
        // walletPassword密码是空格字符
        it(createWalletJson.walletPasswordIsSpace.title, () => {
            cy.createWalletForm(createWalletJson.walletPasswordIsSpace)
            cy.get(createWalletEle.userAgreement).click()
            cy.get(createWalletEle.createWalletTextError.walletPasswordError).should(($text) => {
                expect($text.text()).to.eq(' The password cannot container spaces ! ')
            })
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
        })
        // passwordHint大于50位字符
        it(createWalletJson.walletPasswordHintGt50.title, () => {
            cy.createWalletForm(createWalletJson.walletPasswordHintGt50)
            cy.get(createWalletEle.userAgreement).click()
            cy.get(createWalletEle.createWalletTextError.walletPasswordHintError).should(($text) => {
                expect($text.text()).to.eq(' The maximum length of the hint is 50 ')
            })
            cy.get(createWalletEle.createWalletSubmit).should('be.disabled')
        })
    })

})
import React from 'react'

export const PayForm = (props) => {

    return (
        <form method="POST" action="https://yoomoney.ru/quickpay/confirm.xml">
            <input type="hidden" name="receiver" value="4100116621404412" />
                <input type="hidden" name="formcomment"
                       value={props.type}/>
                    <input type="hidden" name="short-dest"
                           value={props.type}/>
                        <input type="hidden" name="label" value="$order_id"/>
                            <input type="hidden" name="quickpay-form" value="donate"/>
                                <input type="hidden" name="targets" value={props.type}/>
                                    <input type="hidden" name="sum" value={props.sum} data-type="number"/>
                                        <input type="hidden" name="comment"
                                               value={props.type}/>
                                            <input type="hidden" name="need-fio" value="true"/>
                                                <input type="hidden" name="need-email" value="true"/>
                                                    <input type="hidden" name="need-phone" value="false"/>
                                                        <input type="hidden" name="need-address" value="false"/>
                                                            <label><input type="radio" name="paymentType" value="PC"/>ЮMoney</label>
                                                            <label><input type="radio" name="paymentType" value="AC"/>Банковской
                                                                картой</label>
                                                            <input type="submit" value="Перевести"/>
        </form>
)
}
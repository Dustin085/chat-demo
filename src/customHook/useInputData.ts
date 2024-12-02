import { ChangeEvent, useState } from "react";

// 使用說明，input標籤內一定需要有name, value, onChange
// const {inputs, handleInputChange} = useInputData({account:""})
// <input
//    type="email"
//    id="account"
//    name="account"
//    value={inputs.account}
//    onChange={handleInputChange}
// />

function useInputData<T>(dataType: T) {
    // inputs裡面包含了全部的input，使用inputs.foo來取用
    const [inputs, setInputs] = useState(dataType);

    const handleInputChange = (ev: ChangeEvent) => {
        const target = ev.target as HTMLInputElement;
        const name = target.name;
        const value = target.value;
        setInputs(prev => ({ ...prev, [name]: value }));

        // below code is for test
        // console.log(name + ":" + value);
    };

    return { inputs, handleInputChange };
};

export default useInputData;

// TODO 
// 1. 找一個 any 之外更好的型別 OK => 使用<T>(dataType: T)就會自動推斷型別
// https://medium.com/hannah-lin/typescript-generics-%E7%9A%84%E4%BD%BF%E7%94%A8%E6%83%85%E5%A2%83-f5d714ff1fcf
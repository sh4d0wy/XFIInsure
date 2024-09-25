import { useWriteContract } from "wagmi"
import { managerPolygonAddress, PolicyManagerAddress, poolPolygonAddress } from "../Addresses";
import { InsurancePoolAbi, PolicyMaangerAbi } from "../Abi";

export const usePoolWrite = ()=>{
    const {writeContract,isSuccess} = useWriteContract();
    const write = ({functionName,args,value}:{functionName:string,args?:any,value?:bigint})=>{
        const result = writeContract({
            abi:InsurancePoolAbi,
            address:poolPolygonAddress,
            functionName,
            args,
            value
        })
        return result;
    }
    return {write,isSuccess};
} 
import { useWriteContract } from "wagmi"
import { managerPolygonAddress, PolicyManagerAddress, poolPolygonAddress } from "../Addresses";
import { InsurancePoolAbi, PolicyMaangerAbi } from "../Abi";

export const useManagerWrite = ()=>{
    const {writeContract} = useWriteContract();
    const write = ({functionName,args,value}:{functionName:string,args?:any,value?:bigint})=>{
        writeContract({
            abi:PolicyMaangerAbi,
            address:managerPolygonAddress,
            functionName,
            args,
            value
        })
    }
    return {write};
}
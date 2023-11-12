import { useEffect, useState} from 'react'
import { Grid, Button,Segment, Modal} from 'semantic-ui-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './Simulador.css'

const SliderAmount =({amount,updateAmount})=>{
  
    return(
        <Grid>
            <Grid.Row>
				<Grid.Column computer={1} mobile={16} tablet={16}></Grid.Column>
                <Grid.Column computer={10} mobile={16} tablet={16}>
                    <p className='colorFontText fontTitle textAlign'>MONTO TOTAL </p>  
                </Grid.Column>
				<Grid.Column computer={5} mobile={16} tablet={16}>
					<p  className='colorFontText fontTitle'>$ <input className='colorFontText' id="inputAmount" type="number" defaultValue={5000} value={amount} onChange={(e)=>updateAmount(e.target.value,"amount")}></input> </p>
                </Grid.Column>
				
                <Grid.Column computer={2} mobile={16} tablet={16}>  </Grid.Column>
				<Grid.Column computer={12} mobile={16} tablet={16}>  
                	<Slider   min={5000} max={50000} defaultValue={5000} value ={amount} onChange={(data)=>updateAmount(data,"amount")}/>
					 <p  className='colorFontText sliderMin' >$5.000</p> <p className='colorFontText sliderMax' >$50.000</p> 
					
                </Grid.Column>
				<Grid.Column computer={2} mobile={16} tablet={16}>  </Grid.Column> 
        </Grid.Row>
        </Grid>
    )
}

const SliderInstallment =({installment, updateInstallment})=>{
    
    return(<Grid>
        <Grid.Row>
			<Grid.Column computer={1} mobile={16} tablet={16}></Grid.Column>
                <Grid.Column computer={10} mobile={16} tablet={16}>
					<p className='colorFontText fontTitle textAlign'>PLAZO </p> 
                </Grid.Column>
				<Grid.Column computer={5} mobile={16} tablet={16}>
					<p className='colorFontText fontTitle' >   <input id="inputInstallment" className='colorFontText' type="number"  defaultValue={3} value={installment} onChange={(e)=>updateInstallment(e.target.value,"installment")}></input>  </p>
                </Grid.Column>
           
			<Grid.Column computer={2} mobile={16} tablet={16}>  </Grid.Column>
            <Grid.Column computer={12} mobile={16} tablet={16}>  
                <Slider  min={3} max={24} defaultValue={3} value ={installment} onChange={(data)=>updateInstallment(data,"installment")}/>
				<p className='colorFontText sliderMin' >3</p> <p className='colorFontText sliderMax'>24</p> 
            </Grid.Column>
			<Grid.Column computer={2} mobile={16} tablet={16}>  </Grid.Column>
    </Grid.Row>
    </Grid>)
}

export default function Simulador (){
    const [cuotaXmes, setCuotaXmes]     = useState(0)
    const [amount, setAmount]           = useState(5000);
    const [installment, setInstallment] = useState(3);

	const calculate =() =>{
        
        let formulaSimulador = amount/installment;
		const formatNumber = new Intl.NumberFormat('es-ES', {
			style: 'decimal',
			minimumFractionDigits: 2, // Para mostrar dos decimales incluso si son ceros
			maximumFractionDigits: 2, // Limitar a dos decimales
		  });

        setCuotaXmes(formatNumber.format(formulaSimulador))
    }

   const update =(value,type)=>{
        if(type === "amount") setAmount(value)

        if(type === "installment") setInstallment(parseInt(value))

        calculate()
   }
  
    useEffect(()=>{
		calculate(amount, installment)
        
    },[amount,installment,cuotaXmes])
   
   
    const FullDescription =()=>{
        return(
			<Grid>
				<Grid.Row>
					<Grid.Column computer={1} mobile={16} tablet={16}></Grid.Column>
						<Grid.Column computer={10} mobile={16} tablet={16}>
							<p className='smallText colorFontText' style={{textAlign: "left"}}><strong>CUOTA FIJA POR MES </strong></p>
						</Grid.Column>
						<Grid.Column computer={5} mobile={16} tablet={16}>
							<p className='smallText colorFontText'><strong>${cuotaXmes}</strong></p>
						</Grid.Column>
				</Grid.Row>
			</Grid>
		)
    }

    const Buttons =({installment})=>{
        
        const GetCredit =()=>{
            const [openCredit, setOpenCredit] = useState(false)

            function openModal() {
                setOpenCredit(true);
            }

			function closeModal() {
                setOpenCredit(false);
            }

            return(
                <Modal
					closeIcon
					open={openCredit}
					trigger={<Button fluid id="colorButtonGetCredit" className='colorFontText' onClick={openModal}>OBTENÉ CRÉDITO</Button>}
					onClose={() => setOpenCredit(false)}
					onOpen={() => setOpenCredit(true)}
					>
					<Modal.Content>
						<p>¡Crédito solicitado con éxito! </p>
					</Modal.Content>
					<Modal.Actions>
					<Button onClick={closeModal}>Cerrar</Button>
					</Modal.Actions>
				</Modal>
            )
        }

        const GetInfoInstallments =({installment})=>{
            
            const [openInfo, setOpenInfo] = useState(false)
           
            function openModal() {
                setOpenInfo(true);
            }
            
            function closeModal() {
                setOpenInfo(false);
            }
            
            return(
                <Modal
					closeIcon
					open={openInfo}
					trigger={<Button className='colorFontText' fluid id="colorButtonGetInstallment"  onClick={openModal}>VER DETALLE DE CUOTAS</Button>}
					onClose={() => setOpenInfo(false)}
					onOpen={() => setOpenInfo(true)}
					>
					<Modal.Content>
					<p>Detalle de cuotas a pagar  </p>
					{Array(installment).fill().map((_,i)=>(
					
						<p key={i}>Cuota {i+1} - ${cuotaXmes}</p>
					))}
					</Modal.Content>
					<Modal.Actions>
					<Button onClick={closeModal}>Cerrar</Button>
					</Modal.Actions>
				</Modal>
            )
        }
        return(
            <Grid>
				<Grid.Row>
					<Grid.Column computer={1} mobile={16} tablet={16}></Grid.Column>
					<Grid.Column computer={9} mobile={16} tablet={16}>
						<GetCredit />
					</Grid.Column>
					<Grid.Column computer={6} mobile={16} tablet={16}>
						<GetInfoInstallments installment={installment}/>
					</Grid.Column>
				</Grid.Row>
            </Grid>
        )
    }

    return (
        <Segment className='firstQuadrant'>
           <Segment className='secondQuadrant'>
    
                <p className='bigText colorFontText'><strong>Simulá tu crédito</strong></p>
                <SliderAmount amount={amount} updateAmount={update}/>
            	<SliderInstallment installment={installment} updateInstallment={update}/>
                <FullDescription   />
                <Buttons installment={installment}/>  
                  
            </Segment> 
        </Segment>
      )
}
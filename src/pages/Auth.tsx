import { Card, Tab, Tabs } from '@mui/material';
import { useState } from 'react'
import { Login } from '../features/Login';
import { Register } from '../features/Register';
import { AuthTypes } from '../interfaces/types';

export const Auth: React.FC = () => {
	const [selected, setSelected] = useState<AuthTypes>(0);

	return (
        <>
            <div className="flex items-center justify-center h-screen"> 
                    <Card className="max-w-full w-[340px] h-[450px]" sx={{
                        border: "1px solid gray",
                        padding: "12px"
                    }}>
                        <div className="overflow-hidden">
                            <Tabs
                                className='mb-3'
                                variant='fullWidth'
                                value={selected}
                                onChange={(_, tab) => setSelected(tab)}
                            >
                                <Tab key={0} label="Вход" className='text-base font-semibold capitalize' />
                                <Tab key={1} label="Регистрация" className='text-base font-semibold capitalize' />
                            </Tabs>
                            {selected === 0 ? (
                                <Login setSelected={setSelected} />
                            ) : (
                                <Register setSelected={setSelected} />
                            )}
                        </div>
                    </Card>
            </div>
        </>
	)
}
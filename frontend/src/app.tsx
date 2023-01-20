import { useEffect, useState } from 'react';
import { OnClick } from '../wailsjs/go/main/App';
import styled from 'styled-components';
import { Body1 } from 'gobble-lib-react';
import { TriggerButton } from './trigger-button';

type ButtonsWrapperProps = {
    readonly width: number
    readonly height: number
}
const ButtonsWrapper = styled.div<ButtonsWrapperProps>`
    display: grid;
    grid-template-columns: repeat(${({ width }) => width}, 1fr);
    grid-template-rows: repeat(${({ height }) => height}, 1fr);
    gap: 32px;
    padding: 16px;
    height: calc(100% - 32px);
`;

const StyledButton = styled.div`
    border-radius: 8px;
    height: 100%;
    display: grid;
    align-items: center;
    justify-items: center;
`;

function App() {
    const [width, setWidth] = useState(5);
    const [height, setHeight] = useState(4);
    const [buttons, setButtons] = useState<readonly TriggerButton[]>(
        Array.from({ length: width * height }).map((_, i) => ({
            id: `${Math.floor(i / width)}-${i % width}`,
            backgroundColor: '808080',
            text: 'Button',
            textColor: 'ffffff'
        }))
    );

    const onClick = (id: string) => {
        OnClick(id);
    };

    useEffect(() => {
        window.runtime.EventsOn('updateButton', (data: TriggerButton) => {
            setButtons(old => [
                ...old.filter(b => b.id !== data.id),
                data
            ]);
        });

        return () => {
            window.runtime.EventsOff('updateButton');
        };
    }, []);

    return (
        <ButtonsWrapper width={width} height={height}>
            {
                [...buttons].sort((a,b) => a.id.localeCompare(b.id)).map(b => {
                    return (
                        <StyledButton key={b.id} style={{ background: `#${b.backgroundColor}` }} onClick={() => onClick(b.id)}>
                            <Body1 style={{ color: `#${b.textColor}` }}>
                                {b.text}
                            </Body1>
                        </StyledButton>
                    );
                })
            }
        </ButtonsWrapper>
    );
}

export default App;

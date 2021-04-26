import react from "react"

export default function List() {
    let create = () => {
        let table = [];
        for (let i = 0; i < 10; i++) {
            table.push(<div key={i} className="element border"></div>)
        }

        return table;
    }

    return <div className="list">
        {create()}
    </div>
}
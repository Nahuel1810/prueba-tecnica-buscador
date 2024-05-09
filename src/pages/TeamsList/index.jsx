import { faAdd, faFilter, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { Tooltip } from 'react-tooltip';
import DefaultButton from '../../components/Buttons/DefaultButton';
import Searchbar from '../../components/Inputs/Searchbar';
import AddModal from '../../components/Modals/AddModal';
import DeleteModal from '../../components/Modals/DeleteModal';
import FiltersModal from '../../components/Modals/FiltersModal';
import TeamsListElement from '../../components/TeamsListElement';
import { useTeams } from '../../contexts/TeamsContext';
import { useFilters } from '../../contexts/FilterContext';

export default function TeamsList() {
    const { teams } = useTeams();
    const [addModal, setAddModal] = useState(false);
    const [filtersModal, setFiltersModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedTeams, setSelectedTeams] = useState([]);
    const [hasSelectedTeams, setHasSelectedTeams] = useState(false);
    const [searchbarContent, setSearchbarContent] = useState('');
    const [isAscending, setIsAscending] = useState(true);
    const { filters, setFilters } = useFilters();
    // Modifica estado de los equipos seleccionados
    const handleCheckboxChange = (teamId, isChecked) => {
        if (isChecked) {
            setSelectedTeams(prevSelected => [...prevSelected, teamId]);
        } else {
            setSelectedTeams(prevSelected => prevSelected.filter(id => id !== teamId));
        }
    };

    const handleModalToggle = (modalStateSetter) => () => modalStateSetter(prevState => !prevState);

    // Determinar si hay equipos seleccionados
    useEffect(() => {
        if (selectedTeams.length > 0) {
            setHasSelectedTeams(true);
        } else {
            setHasSelectedTeams(false);
        }
    }, [selectedTeams]);

    useEffect(() => {
        setSelectedTeams([]);
        setHasSelectedTeams(false);
    }, [teams]);

    // Filtrado de barra de busqueda
    const filteredTeams = teams.filter(equipo => {
        // Verificar si el tipo coincide con el filtro
        if (filters.type && equipo.tipo !== filters.type) {
            return false;
        }
        // Verificar si la valoración mínima coincide con el filtro
        if (filters.minRating && equipo.valoracion < filters.minRating) {
            return false;
        }
        // Verificar si el nombre coincide con el contenido de la barra de búsqueda
        return equipo.nombre.toLowerCase().includes(searchbarContent.toLowerCase());
    });

    const sortedTeams = filteredTeams.slice().sort((a, b) => {
        if (isAscending) {
            return a.nombre.localeCompare(b.nombre);
        } else {
            return b.nombre.localeCompare(a.nombre);
        }
    });

    const toggleOrder = () => {
        setIsAscending(prevState => !prevState);
    };

    return (
        <div className='p-2 m-2'>
            <div className='flex flex-row gap-2'>
                <Searchbar value={searchbarContent} onChange={(e) => setSearchbarContent(e.target.value)} />
                <div className='w'>
                    <DefaultButton onClick={handleModalToggle(setFiltersModal)}><FontAwesomeIcon icon={faFilter} className='py-1' /></DefaultButton>
                </div>
            </div>

            <h1 className="text-2xl text-center text-gray-800 font-bold py-1 mt-3">Equipos</h1>
            <div className='flex flex-row justify-end'>
                <div>
                    <DefaultButton onClick={handleModalToggle(setDeleteModal)} bgColor="bg-error/70 border hover:bg-error" textColor="text-white" disabled={!hasSelectedTeams}>
                        <span className='flex flex-row justify-between items-center gap-3'>
                            <p>Borrar</p>
                            <FontAwesomeIcon icon={faTrash} />
                        </span>
                    </DefaultButton>
                </div>
            </div>

            <div className='p-2 mt-1 bg-gray-50 w-full flex flex-row justify-between items-center rounded-md font-bold border cursor-pointer' onClick={toggleOrder}>
                <span>Nombre</span>
                <FontAwesomeIcon icon={isAscending ? faSortUp : faSortDown} />
            </div>

            {sortedTeams.length > 0 ?
                (sortedTeams.map((equipo) => (
                    <TeamsListElement
                        key={equipo.id}
                        equipo={equipo}
                        isSelected={selectedTeams.includes(equipo.id)}
                        onCheckboxChange={handleCheckboxChange}
                    />
                ))) :
                <>
                    <div className='flex flex-col mt-2 px-4 pb-4 border rounded-md bg-white'>
                        <p className='text-lg text-gray-500 text-center mt-5'>No hay equipos que mostrar</p>
                    </div>
                </>

            }

            <div className='fixed bottom-5 right-5'>
                <button data-tooltip-id="tooltip-agregar" data-tooltip-content="Agregar" className='btn bg-primary text-white rounded-full w-12 h-12 flex justify-center items-center' onClick={handleModalToggle(setAddModal)}><FontAwesomeIcon icon={faAdd} /></button>
            </div>
            <AddModal isOpen={addModal} handleClose={handleModalToggle(setAddModal)} />
            <FiltersModal isOpen={filtersModal} handleClose={handleModalToggle(setFiltersModal)} />
            <DeleteModal isOpen={deleteModal} handleClose={handleModalToggle(setDeleteModal)} typeOfModal={1} entitiesId={selectedTeams} />
            <Tooltip id="tooltip-agregar" className='rounded-md font-semibold' />
        </div>
    );
}

import { faAdd, faFaceSadTear, faFilter, faSortDown, faSortUp, faTrash } from '@fortawesome/free-solid-svg-icons';
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
        <>
            <div className='pt-6 px-4 md:px-24 bg-gradient-to-r from-emerald-500 to-emerald-700 to-90% '>
                <h1 className="text-3xl text-center text-white font-bold my-3 md:text-4xl">Lista de equipos</h1>
                <div className='flex flex-row gap-2 md:justify-center md:my-5 md:pb-10 pt-4 pb-8'>
                    <Searchbar value={searchbarContent} onChange={(e) => setSearchbarContent(e.target.value)} />
                    <div className=''>
                        <DefaultButton onClick={handleModalToggle(setFiltersModal)} bgColor="bg-transparent hover:bg-gray-300/30" textColor="text-gray-300 hover:text-white"><FontAwesomeIcon icon={faFilter} size='lg' /></DefaultButton>
                    </div>
                </div>
            </div>


            <div className='p-2 m-2 md:px-24'>
                <div className='flex flex-row justify-between gap-10 my-2 md:my-5'>
                    <div className='p-2 bg-white w-full flex flex-row justify-between items-center rounded-md font-semibold md:font-bold text-sm md:text-base border cursor-pointer md:w-1/4 text-gray-600' onClick={toggleOrder}>
                        <span>Nombre</span>
                        <FontAwesomeIcon icon={isAscending ? faSortUp : faSortDown} />
                    </div>
                    <div>
                        <DefaultButton onClick={handleModalToggle(setDeleteModal)} bgColor="bg-error/70 border hover:bg-error" textColor="text-white" disabled={!hasSelectedTeams}>
                            <span className='flex flex-row justify-between items-center gap-3'>
                                <p>Borrar</p>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        </DefaultButton>
                    </div>
                </div>


                <div className='md:flex md:flex-row md:w-full md:flex-wrap md:gap-8'>
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
                            <div className='flex flex-col mt-2 px-4 pb-4 border rounded-md bg-white md:w-full'>
                                <p className='text-lg text-gray-500 text-center mt-5'>No hay equipos que mostrar</p>
                                <FontAwesomeIcon icon={faFaceSadTear} className='text-gray-300 mt-2' size='3x' />
                            </div>
                        </>
                    }
                </div>

                <div className='fixed bottom-5 right-5'>
                    <button data-tooltip-id="tooltip-agregar" data-tooltip-content="Agregar" className='btn bg-primary text-white rounded-full w-12 h-12 flex justify-center items-center' onClick={handleModalToggle(setAddModal)}><FontAwesomeIcon icon={faAdd} /></button>
                </div>
                <AddModal isOpen={addModal} handleClose={handleModalToggle(setAddModal)} />
                <FiltersModal isOpen={filtersModal} handleClose={handleModalToggle(setFiltersModal)} />
                <DeleteModal isOpen={deleteModal} handleClose={handleModalToggle(setDeleteModal)} typeOfModal={1} entitiesId={selectedTeams} />
                <Tooltip id="tooltip-agregar" className='rounded-md font-semibold' />
            </div>
        </>
    );
}

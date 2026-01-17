import { render, screen, fireEvent } from '@testing-library/react'
import { TaskButton, DeleteButton, CreateTaskButton } from './buttons'
import { AppContext } from '../../context/appContext'
import React from 'react'
import { buttonStatusType } from './buttonsTypes'

describe('TaskButton', () => {
  const renderWithContext = ({
    doneTask = '',
    status = '',
    doneEffect = 5
  }: {
    doneTask?: '' | 'done'
    status?: buttonStatusType
    doneEffect?: number
  }) => {
    const setDoneTask = jest.fn()
    const setDoneEffect = jest.fn()

    render(
      <AppContext.Provider value={{ doneEffect, setDoneEffect }}>
        <TaskButton doneTask={doneTask} status={status} setDoneTask={setDoneTask} />
      </AppContext.Provider>
    )

    return { setDoneTask, setDoneEffect }
  }

  it('renders correctly with default props', () => {
    renderWithContext({})

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent('check_circle')
  })

  it('applies done and status classes correctly', () => {
    renderWithContext({ doneTask: 'done', status: 'completed' })

    const container = screen.getAllByRole('button')[0].parentElement
    expect(container).toHaveClass('done')
    expect(container).toHaveClass('completed')
  })

  it('sets doneTask to "done" when clicked and was empty', () => {
    const { setDoneTask, setDoneEffect } = renderWithContext({
      doneTask: '',
      doneEffect: 10
    })

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(setDoneTask).toHaveBeenCalledWith('done')
    expect(setDoneEffect).toHaveBeenCalledWith(9)
  })

  it('sets doneTask to empty when clicked and was "done"', () => {
    const { setDoneTask, setDoneEffect } = renderWithContext({
      doneTask: 'done',
      doneEffect: 3
    })

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(setDoneTask).toHaveBeenCalledWith('')
    expect(setDoneEffect).toHaveBeenCalledWith(2)
  })
})

describe('DeleteButton', () => {
  it('renders delete icon correctly', () => {
    render(<DeleteButton icon='delete' doneTask='' />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('delete')
    expect(button).toHaveClass('task-delete-button')
  })

  it('renders restore icon correctly', () => {
    render(<DeleteButton icon='restore_from_trash' doneTask='done' />)

    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('restore_from_trash')
    expect(button).toHaveClass('task-restore_from_trash-button')
  })

  it('applies done class when doneTask is set', () => {
    render(<DeleteButton icon='delete' doneTask='done' />)

    const wrapper = screen.getByRole('button').parentElement
    expect(wrapper).toHaveClass('done')
  })
})

describe('CreateTaskButton', () => {
  it('renders button and text correctly', () => {
    const handleClick = jest.fn()
    render(<CreateTaskButton handleClick={handleClick} />)

    expect(screen.getByText('Create task')).toBeInTheDocument()
    expect(screen.getByText('add')).toBeInTheDocument()
  })

  it('calls handleClick when clicked', () => {
    const handleClick = jest.fn()
    render(<CreateTaskButton handleClick={handleClick} />)

    fireEvent.click(screen.getAllByRole('button')[0])

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})

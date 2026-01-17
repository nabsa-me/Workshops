import { render, fireEvent } from '@testing-library/react'
import HomeTask from './HomeTask'
import { AppContext } from '../../shared/context/appContext'
import React from 'react'

const baseTask = {
  id: 1,
  title: 'My task',
  completed: false,
  deleted: false
}

type RenderWithContextOptions = {
  doneEffect?: number
  setDoneEffect?: jest.Mock
}

const renderWithContext = (
  ui: React.ReactElement,
  { doneEffect = 1, setDoneEffect = jest.fn() }: RenderWithContextOptions = {}
) => {
  return {
    ...render(<AppContext.Provider value={{ doneEffect, setDoneEffect }}>{ui}</AppContext.Provider>),
    setDoneEffect
  }
}

describe('HomeTask', () => {
  it('renders task title', () => {
    const { getByDisplayValue } = renderWithContext(<HomeTask task={baseTask} />)

    expect(getByDisplayValue('My task')).toBeTruthy()
  })

  it('applies autofocus and selected class when autofocus is true', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} autofocus />)

    const input = container.querySelector('input') as HTMLInputElement
    const wrapper = container.querySelector('.homePage-taskItem-task')

    expect(document.activeElement).toBe(input)
    expect(wrapper?.className).toContain('selected')
  })

  it('does not autofocus when autofocus is false', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} autofocus={false} />)

    const input = container.querySelector('input') as HTMLInputElement
    expect(document.activeElement).not.toBe(input)
  })

  it('sets selected state when input is clicked', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />)

    const input = container.querySelector('input') as HTMLInputElement
    const wrapper = container.querySelector('.homePage-taskItem-task')

    fireEvent.click(input)

    expect(wrapper?.className).toContain('selected')
  })

  it('updates task content when input value changes', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />)

    const input = container.querySelector('input') as HTMLInputElement

    fireEvent.change(input, { target: { value: 'Updated task' } })

    expect(input.value).toBe('Updated task')
  })

  it('clears selected state and blurs input on submit', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />)

    const form = container.querySelector('form') as HTMLFormElement
    const input = container.querySelector('input') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.submit(form)

    expect(container.querySelector('.selected')).toBeNull()
    expect(document.activeElement).not.toBe(input)
  })

  it('clears selected state when clicking outside (edge case)', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />)

    const input = container.querySelector('input') as HTMLInputElement

    fireEvent.click(input)
    fireEvent.mouseUp(document.body)

    expect(container.querySelector('.selected')).toBeNull()
  })

  it('adds inactive class when task is completed', () => {
    const completedTask = { ...baseTask, completed: true }

    const { container } = renderWithContext(<HomeTask task={completedTask} />)

    expect(container.querySelector('.inactive')).toBeTruthy()
  })

  it('adds inactive class when task is deleted (edge case)', () => {
    const deletedTask = { ...baseTask, deleted: true }

    const { container } = renderWithContext(<HomeTask task={deletedTask} />)

    expect(container.querySelector('.inactive')).toBeTruthy()
  })

  it('adds special class when doneEffect is falsy (edge case)', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />, { doneEffect: 0 })

    expect(container.querySelector('.special')).toBeTruthy()
  })

  it('calls onBlur callback when input blurs', () => {
    const onBlur = jest.fn()

    const { container } = renderWithContext(<HomeTask task={baseTask} onBlur={onBlur} />)

    const input = container.querySelector('input') as HTMLInputElement
    fireEvent.blur(input)

    expect(onBlur).toHaveBeenCalledTimes(1)
  })

  it('does NOT clear selected state when clicking inside the task (handleClickOutside negative path)', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />)

    const input = container.querySelector('input') as HTMLInputElement
    const wrapper = container.querySelector('.homePage-taskItem-task') as HTMLDivElement

    fireEvent.click(input)
    expect(wrapper.className).toContain('selected')

    fireEvent.mouseUp(wrapper)

    expect(wrapper.className).toContain('selected')
  })
})

describe('HomeTask integrations with TaskButton and DeleteButton', () => {
  it('toggles done state when TaskButton is clicked', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />)

    const wrapper = container.querySelector('.homePage-taskItem-task') as HTMLDivElement
    const taskButton = container.querySelector('.task-button') as HTMLDivElement

    expect(wrapper.className).not.toContain('done')

    fireEvent.click(taskButton)
    expect(wrapper.className).toContain('done')

    fireEvent.click(taskButton)
    expect(wrapper.className).not.toContain('done')
  })

  it('applies completed status class to TaskButton when task is completed', () => {
    const completedTask = { ...baseTask, completed: true }

    const { container } = renderWithContext(<HomeTask task={completedTask} />)

    const taskButton = container.querySelector('.task-button.completed')

    expect(taskButton).toBeTruthy()
  })

  it('renders delete icon when task is not deleted', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />)

    expect(container.textContent).toContain('delete')
    expect(container.textContent).not.toContain('restore_from_trash')
  })

  it('renders restore icon when task is deleted (integration with DeleteButton)', () => {
    const deletedTask = { ...baseTask, deleted: true }

    const { container } = renderWithContext(<HomeTask task={deletedTask} />)

    expect(container.textContent).toContain('restore_from_trash')
    expect(container.textContent).not.toContain('delete')
  })

  it('DeleteButton reflects done state visually when task is marked as done', () => {
    const { container } = renderWithContext(<HomeTask task={baseTask} />)

    const taskButton = container.querySelector('.task-button') as HTMLDivElement

    fireEvent.click(taskButton)

    const deleteButtonWrapper = container.querySelector('.task-button.done')

    expect(deleteButtonWrapper).toBeTruthy()
  })
})

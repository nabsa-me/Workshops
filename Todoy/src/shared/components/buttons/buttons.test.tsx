import { render, screen, fireEvent } from '@testing-library/react'
import { TaskButton, DeleteButton, CreateTaskButton } from './buttons'
import { useDoneEffectStore } from '../../../app/store'

const tasks = [
  { id: 1, title: 'Buy Milk', completed: false, deleted: false },
  { id: 2, title: 'Go Gym', completed: true, deleted: false },
  { id: 3, title: 'Read Book', completed: false, deleted: true }
]

const setDoneTask = jest.fn()

describe('TaskButton', () => {
  beforeEach(() => {
    useDoneEffectStore.setState({
      doneEffect: 0,
      setDoneEffectSelector: jest.fn((doneEffect) => {
        useDoneEffectStore.setState(() => ({
          doneEffect: doneEffect
        }))
      })
    })
  })

  it('renders correctly with default props', () => {
    render(<TaskButton doneTask='' status='' setDoneTask={setDoneTask} task={tasks[0]} />)

    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent('check_circle')
  })

  it('applies done and status classes correctly', () => {
    render(<TaskButton doneTask='done' status='completed' setDoneTask={setDoneTask} task={tasks[0]} />)

    const container = screen.getAllByRole('button')[0].parentElement
    expect(container).toHaveClass('done')
    expect(container).toHaveClass('completed')
  })

  it('sets doneTask to "done" when clicked and was empty', () => {
    useDoneEffectStore.setState({
      doneEffect: 10
    })

    render(<TaskButton doneTask='' status='completed' setDoneTask={setDoneTask} task={tasks[0]} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setDoneTask).toHaveBeenCalledWith('done')
    expect(useDoneEffectStore.getState().setDoneEffectSelector).toHaveBeenCalledWith(9)
  })

  it('sets doneTask to empty when clicked and was "done"', () => {
    useDoneEffectStore.setState({
      doneEffect: 3
    })

    render(<TaskButton doneTask='done' status='completed' setDoneTask={setDoneTask} task={tasks[0]} />)

    fireEvent.click(screen.getAllByRole('button')[0])
    expect(setDoneTask).toHaveBeenCalledWith('')
    expect(useDoneEffectStore.getState().setDoneEffectSelector).toHaveBeenCalledWith(2)
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

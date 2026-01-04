export const CreateTaskButton = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <div className='createTaskButton' role='button' onClick={() => handleClick()}>
      <span className='material-symbols-rounded add-task-button bold' role='button'>
        add
      </span>
      <p>Create task</p>
    </div>
  )
}
